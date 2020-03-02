const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const { Octokit } = require('@octokit/rest')
const { loadConfig, getRepoInfo } = require('shipjs-lib');

dotenv.config({ path: path.resolve('.', '.env') })

const { remote } = loadConfig('.');
const { owner, repo } = getRepoInfo(remote, '.');

const getOctokit = () => {
  const octokit = new Octokit({
    auth: `token ${process.env.GITHUB_TOKEN}`,
  });

  return octokit
}

module.exports = {
  mergeStrategy: { toSameBranch: ['master'] },
  updateChangelog: false,
  publishCommand: ({ tag }) => (
    `echo Start publish ${tag}`
  ),
  afterPublish: async ({ version, releaseTag }) => {
    const octokit = getOctokit()
    const { data } = await octokit.repos.listReleases({ owner, repo })
    const drafts = data.filter(d => d.draft === true && d.name.startsWith('v'))
    if (drafts.length) {
      fs.writeFileSync(
        path.resolve('.', `changelog.json`),
        JSON.stringify(drafts[0])
      )
    } else {
      console.log(`> Draft not found.`)
    }
  },
  releases: {
    extractChangelog: ({ version, dir }) => {
      try {
        const changelogFilePath = path.resolve('.', 'changelog.json')
        if (fs.existsSync(changelogFilePath)) {
          const changelog = JSON.parse(fs.readFileSync(changelogFilePath))
          // Delete temp changelog
          fs.unlink(changelogFilePath, (err) => {})

          // Replact version no to tag name
          const body = changelog['body'].replace(
            `...${version}`, `...v${version}`
          )
          if (changelog['draft']) {
            const octokit = getOctokit()

            octokit.repos.deleteRelease({
              owner,
              repo,
              release_id: changelog['id'],
            }).then(() => {
              console.log(`> Delete draft suceed.`)
            }).catch(() => {
              console.log(`> Delete draft failed.`)
            })
          }

          return body
        }
        console.log(`> ${changelogFilePath} not found.`)
      } catch(e) {
        console.log(`> Exception raised.`)
        console.log(e.toString())
      }
      return `Add CHANGELOG manually.\nCopy from draft ${version}'s release note`
    }
  }
}

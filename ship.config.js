const owner = 'heavenshell'
const repo = 'ts-react-boilerplate'
module.exports = {
  mergeStrategy: { toSameBranch: ['master'] },
  updateChangelog: false,
  publishCommand: ({ tag }) => (
    `echo Start publish ${tag}`
  ),
  afterPublish: async ({ version, releaseTag }) => {
    const fs = require('fs')
    const path = require('path')
    const dotenv = require('dotenv')
    const { Octokit } = require('@octokit/rest')

    dotenv.config({ path: path.resolve('.', '.env') })

    const octokit = new Octokit({
      auth: `token ${process.env.GITHUB_TOKEN}`,
    });

    const { data } = await octokit.repos.listReleases({ owner, repo })
    const drafts = data.filter(d => d.draft === true && d.name.startsWith('v'))
    console.log(`> draft length is ${drafts.length}`)
    if (drafts.length) {
      fs.writeFileSync(
        path.resolve('.', `changelog.json`),
        JSON.stringify(drafts[0])
      )
    } else {
      console.log(`> draft not found.`)
    }
  },
  releases: {
    extractChangelog: ({ version, dir }) => {
      const fs = require('fs')
      const path = require('path')
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
            octokit.repos.deleteRelease({
              owner,
              repo,
              release_id: drafts[0].id,
            }).then(() => {
              console.log(`> delte draft suceed.`)
            }).catch(() => {
              console.log(`> delete draft failed.`)
            })
          }

          return body
        }
        console.log(`> ${changelogFilePath} not found.`)
      } catch(e) {
        console.log(`> Exception raised.`)
      }
      return `Add CHANGELOG manually.\nCopy from draft ${version}'s release note`
    }
  }
}

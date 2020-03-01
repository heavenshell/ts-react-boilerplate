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
    const print = require('shipjs/src/util/print')

    dotenv.config({ path: path.resolve('.', '.env') })

    const octokit = new Octokit({
      auth: `token ${process.env.GITHUB_TOKEN}`,
    });

    const { data } = await octokit.repos.listReleases({ owner, repo })
    const drafts = data.filter(d => d.draft === true && d.name.startsWith('v'))
    if (drafts.length) {
      fs.writeFileSync(
        path.resolve('.', `changelog.json`),
        JSON.stringify(drafts[0])
      )
    } else {
      print(`> draft not found.`)
    }
  },
  releases: {
    extractChangelog: ({ version, dir }) => {
      const fs = require('fs')
      const path = require('path')
      const print = require('shipjs/src/util/print')
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
              print(`> delte draft suceed.`)
            }).catch(() => {
              print(`> delete draft failed.`)
            })
          }

          return body
        }
        print(`> ${changelogFilePath} not found.`)
      } catch(e) {
        print(`> Exception raised.`)
      }
      return `Add CHANGELOG manually.\nCopy from draft ${version}'s release note`
    }
  }
}

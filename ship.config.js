module.exports = {
  mergeStrategy: { toSameBranch: ['master'] },
  updateChangelog: true,
  publishCommand: ({ tag }) => (
    `echo Start publish ${tag}`
  ),
  afterPublish: ({ version, releaseTag }) => {
    const fs = require('fs')
    const path = require('path')
    const dotenv = require('dotenv')
    const { Octokit } = require('@octokit/rest')

    dotenv.config({ path: path.resolve('.', '.env') })

    const octokit = new Octokit({
      auth: `token ${process.env.GITHUB_TOKEN}`,
    });

    octokit.repos.listReleases({
      owner: 'heavenshell',
      repo: 'ts-react-boilerplate'
    }).then(({ data }) => {
      const drafts = data.filter(d => d.draft === true && d.name.startsWith('v'))
      if (drafts.length) {
        fs.writeFileSync(
          path.resolve('.', `changelog.json`),
          JSON.stringify(drafts[0])
        )
      }
    }).catch(e => {
      // Maybe GitHub is down...
    });
  },
  release: {
    extractChangelog: ({ version, dir }) => {
      const fs = require('fs')
      try {
        const changelogFilePath = path.resolve('.', `changelog.json`)
        if (fs.existsSync(changelogFilePath) {
          const changelog = JSON.parse(fs.readFileSync(changelogFilePath))
          // Delete temp changelog
          fs.unlinkSync(changelogFilePath)

          return changelog['body']
        }
        return 'Add CHANGELOG manually...'
      } catch(e) {
      }
    }
  }
}

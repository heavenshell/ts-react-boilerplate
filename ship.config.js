module.exports = {
  mergeStrategy: { toSameBranch: ['master'] },
  updateChangelog: false,
  publishCommand: ({ tag }) => (
    `echo Start publish ${tag}`
  ),
}

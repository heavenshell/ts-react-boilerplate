module.exports = {
  mergeStrategy: { toSameBranch: ['master'] },
  updateChangelog: true,
  publishCommand: ({ tag }) => (
    `echo Start publish ${tag}`
  ),
}

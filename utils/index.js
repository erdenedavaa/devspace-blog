export const sortByDate = (a, b) => {
  return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
}

export const capitalizeFirstLetter = (text) => {
  if (text.length <= 3) return text.toUpperCase()

  return text[0].toUpperCase() + text.substring(1)
}

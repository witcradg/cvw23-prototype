import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import parse from "html-react-parser"
import Layout from "../components/layout"
import Seo from "../components/seo"

// todo Are we actually using Gutenberg?
// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// todo update this once @wordpress upgrades their postcss version
import "../css/@wordpress/block-library/build-style/style.css"
import "../css/@wordpress/block-library/build-style/theme.css"

const WpPageTemplate = ({ data: { page } }) => {
//   console.log("page: ", page)
  return (
    <Layout>
      <Seo title={page.title} description={page.excerpt} />
      {/* <div>{page.title}</div> <div>description={page.excerpt} </div> */}
      <hr />
      <div>{parse(page.content)}</div>
    </Layout>
  )
}

export default WpPageTemplate

export const pageQuery = graphql`
  query BlogPostById($id: String!) {
    page: wpPage(id: { eq: $id }) {
      id
      excerpt
      content
      title
      date(formatString: "MMMM DD, YYYY")
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
          }
        }
      }
    }
  }
`

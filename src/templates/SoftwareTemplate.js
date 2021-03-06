import React from "react"
import '../styles/index.css';
import Layout from '../components/Layout';
import { graphql } from 'gatsby';
import {StyledIndivPage} from '../styles/indiv_page'
import DownloadStatsPlot from '../components/Plots/DownloadStatsPlot';

// This is a page query - Gatsby looks for one page
// query per file. In components, use StaticQuery
// more here: https://www.gatsbyjs.org/docs/page-query/
export const query = graphql`
  query ($slug: String!, $name: String!) {
    softwareCsv( slug: { eq: $slug } ) {
        name 
        lab
        slug
        short_desc
        long_desc
        version
        authors
        keywords
        licensing
        citation
        year
        doi
        scholar_link
        scholar_link_cited
        major_pubs_cited
        download_link
        instruction_link
        download_stats_link
    }
    dlStatsJson(name: {eq: $name}) {
        stats {
          downloads
          month
          year
        }
    }
  }
`
// dlStatsJson(name: {eq: $name}) {
//     stats {
//       downloads
//       month
//       year
//     }
// }

const SoftwareTemplate = ({data}) => {
    const item = data.softwareCsv
    const stats = data.dlStatsJson

    return (
        <Layout page="SoftwareTemplate">
            <StyledIndivPage>
                <div className="container title">
                    <h1>{item.name}</h1>
                    <h3>{item.short_desc}</h3>
                </div>
                <div className="container info">
                    <div className="section">
                        <span className="item-heading">Description:</span> {item.long_desc} <p/>
                    </div>
                    <div className="section">
                        <span className="item-heading">Authors:</span> {item.authors} <p/>
                        <span className="item-heading">Lab:</span> {item.lab} <p/>
                        <span className="item-heading">Version:</span> {item.version} <p/>
                        <span className="item-heading">Keywords:</span> {item.keywords} <p/>
                        <span className="item-heading">Licensing:</span> {item.licensing} <p/>
                        <div className="download">
                        <a href={item.download_link}>Download</a>
                        </div>
                    </div>
                </div>
                <div className="container title">
                    <h4>Citation</h4>
                </div>
                <div className="container citation">
                    <div className="section">
                        {item.citation}
                        <div className="links">
                            <a href={`http://doi.org/${item.doi}`}>DOI</a> 
                            <a href={item.scholar_link}>Google Scholar</a>
                            <a href={item.scholar_link_cited}>Cited By</a>
                        </div>
                    </div>
                </div>
                <DownloadStatsPlot
                    name={item.name}
                    data={stats}
                />
            </StyledIndivPage>
        </Layout>
      
    )
}

export default SoftwareTemplate;


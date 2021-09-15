import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Card from '../components/Card';
import Layout from '../components/Layout';

const Index = ({
  data: {
    allBehanceProjects: { edges: projects },
  },
}) => (
  <Layout>
    <div className="flex-grid">
      {projects.map(project => (
        <Card
          date={project.node.published}
          views={project.node.stats.views}
          appreciations={project.node.stats.appreciations}
          comments={project.node.stats.comments}
          name={project.node.name}
          cover={project.node.covers.size_original}
          url={project.node.url}
          areas={project.node.areas}
          key={project.node.id}
        />
      ))}
    </div>
  </Layout>
);

export default Index;

Index.propTypes = {
  data: PropTypes.shape({
    allBehanceProjects: PropTypes.shape({
      edges: PropTypes.any.isRequired,
    }).isRequired,
  }).isRequired,
};

export const projectQuery = graphql`
  query projectQuery {
    allBehanceProjects(sort: { fields: [published], order: DESC }) {
      edges {
        node {
          id
          name
          published
          url
          areas
          covers {
            size_original
          }
          stats {
            views
            appreciations
            comments
          }
        }
      }
    }
  }
`;

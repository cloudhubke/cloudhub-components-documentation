import React from 'react';
import {
  Block,
  ListMenu,
  ListSubMenu,
  ListMenuItem,
  Text,
} from 'cloudhub-components';
import sizes from 'cloudhub-components/dist/theme/Sizes';
import { graphql, useStaticQuery, Link } from 'gatsby';
import HomeLayout from './home-layout';
import { colors } from '../theme';

const DocsLayout = props => {
  const { allMdx: { nodes } } = useStaticQuery(graphql`
    query {
      allMdx {
        nodes {
          frontmatter {
            title
            sidebar_label
          }
          fileAbsolutePath
        }
      }
    }
  `);


  const renderReactComponents = () => {
    const files = [...nodes].filter(n => n.fileAbsolutePath.includes('docs/react')).map(({ frontmatter }) => {
      const { sidebar_label } = frontmatter;
      return sidebar_label;
    });
    return files.map(file => (
    <Link key={file} to={`/docs/react/${file}`}>
      <ListMenuItem>
        <Text>{file}</Text>
      </ListMenuItem>
    </Link>
    ));
  };

  return (
    <HomeLayout>
      <Block row>
        <Block
          style={{ width: 250, paddingTop: sizes.padding }}
          flex={false}
          color={colors.gray3}
        >
          <ListMenu>
            <ListSubMenu expanded header="Getting Started">
              <Link to="/docs/getting-started/react">
                <ListMenuItem>
                  <Text>React</Text>
                </ListMenuItem>
              </Link>
              <Link to="/docs/getting-started/react-native">
                <ListMenuItem>
                  <Text>React-Native</Text>
                </ListMenuItem>
              </Link>
            </ListSubMenu>

            <ListSubMenu expanded header="React Components">

            {renderReactComponents()}

            </ListSubMenu>
          </ListMenu>
        </Block>

        <Block padding={sizes.padding}>{props.children}</Block>
      </Block>
    </HomeLayout>
  );
};

export default DocsLayout;

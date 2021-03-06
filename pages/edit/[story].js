import React from 'react'
import { Query, Mutation, withApollo } from 'react-apollo'
import Router, { useRouter } from 'next/router'

import { storyBySlug } from '../../graphql/queries'
import { updateStory, deleteStory } from '../../graphql/mutations'

import SecurePage from '../../components/hoc/secure-page'
import StoryForm from '../../components/forms/story-form'

function EditStoryPage({ session, client }) {
  const router = useRouter()
  const { story } = router.query

  return (
    <Query query={storyBySlug} variables={{ slug: story }}>
      {({ loading, error, data }) => {
        if (error) {
          return (
            <div>
              <i>Error loading stories.</i>
            </div>
          )
        }
        if (loading) {
          return (
            <div>
              <i>Loading...</i>
            </div>
          )
        }

        return (
          <Mutation mutation={updateStory}>
            {(updateStory, { loading, error }) => (
              <Mutation mutation={deleteStory}>
                {(deleteStory, { loading2, error2 }) => (
                  <React.Fragment>
                    <StoryForm
                      session={session}
                      storyToEdit={data.story}
                      onSubmit={story => {
                        updateStory({ variables: { id: data.story.id, story } })
                          .then(res => {
                            console.log('res', JSON.stringify(res))
                            Router.push('/')
                          })
                          .catch(handleError)
                      }}
                      onDelete={id => {
                        if (
                          window.confirm(
                            'Are you sure you want to delete this story?'
                          )
                        ) {
                          deleteStory({ variables: { id } })
                            .then(res => {
                              console.log('res', JSON.stringify(res))
                              Router.push('/')
                              client.resetStore()
                            })
                            .catch(handleError)
                        }
                      }}
                      onCancel={() => Router.push('/')}
                      loading={loading || loading2}
                    />
                    {(error || error2) && <div>There was an error.</div>}
                  </React.Fragment>
                )}
              </Mutation>
            )}
          </Mutation>
        )
      }}
    </Query>
  )
}

function handleError(err) {
  console.error('error', JSON.stringify(err))
}

export default SecurePage(withApollo(EditStoryPage))

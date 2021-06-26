import React from 'react'
import App from 'next/app'

import Player from '../components/player'

class KchungNews extends App {
  state = {
    openStory: null,
    isPlaying: false,
    playingStory: {
      audio: {
        url: ''
      }
    }
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  setPlayState = state => this.setState({ isPlaying: state })

  togglePlayPause = () =>
    this.setState(prevState => ({
      isPlaying: !prevState.isPlaying
    }))

  onStoryClick = story => {
    this.setState(prevState => ({
      openStory: prevState.openStory !== story.id ? story.id : null,
      goToStory: prevState.openStory === story.id ? story : null
    }))
  }

  onStoryPlayClick = story => {
    // if it's the same story, toggle
    // if it's a different story, just play it
    this.setState(prevState => ({
      isPlaying:
        prevState.playingStory.id === story.id ? !prevState.isPlaying : true,
      playingStory: story
    }))
  }

  render() {
    const { Component, pageProps } = this.props
    const { openStory, goToStory, isPlaying, playingStory } = this.state
    const {
      title,
      audio: { url }
    } = playingStory

    const audioUrl = url
    return (
      <>
        <Component
          {...pageProps}
          openStory={openStory}
          goToStory={goToStory}
          isPlaying={isPlaying}
          playingStory={playingStory}
          onStoryClick={this.onStoryClick}
          onStoryPlayClick={this.onStoryPlayClick}
        />
        {audioUrl && (
          <Player
            audioUrl={audioUrl}
            title={title}
            isPlaying={isPlaying}
            setPlayState={this.setPlayState}
            togglePlayPause={this.togglePlayPause}
          />
        )}
      </>
    )
  }
}

export default KchungNews

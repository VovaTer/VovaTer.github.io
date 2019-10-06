import React from 'react';
import './App.css';

class App extends React.Component  { 
   constructor(props) {
     super(props)
     this.state = {
      numFrom: 'empty',
      numTo: 'empty',
      totalNum: 0,
      pyramids: [
        [],
        [20],
        [100, 80, 60, 40],
      ]
     }
   }

  handleSelect = (selected) => {
    if (this.state.numFrom === 'empty') { // If we haven't yet selected 'from'
      this.setState({numFrom:selected})
    } else { 
      if (this.state.numFrom === selected) { // If we select the same as already selected
        this.setState({numFrom:'empty'})
      } else {
        this.setState({numTo:selected}, () => {  // Then we're probably selecting 'to'
          this.handleMove(this.state.numFrom, this.state.numTo)
        })
      }
    }
  }

  handleMove = (numFrom, numTo) => {
    const pyramids = [...this.state.pyramids]
    const fromLastWidth = pyramids[numFrom][pyramids[numFrom].length - 1]
    const toLastWidth = pyramids[numTo][pyramids[numTo].length - 1]
    console.log('fromLastWidth', fromLastWidth);
    console.log('toLastWidth', toLastWidth);
    if (fromLastWidth > toLastWidth || !fromLastWidth) {
      this.setState({numFrom:'empty', numTo: 'empty', error: true}, () => {
        setTimeout(() => {
          this.setState({error: false})
        }, 600)
      })
      return 
    }
    pyramids[numTo].push(pyramids[numFrom][pyramids[numFrom].length - 1])
    pyramids[numFrom].pop()
    this.setState({pyramids, numFrom:'empty', numTo: 'empty',totalNum: this.state.totalNum + 1})
  }

   render() {
    let appStyles = {height: `${(this.state.pyramids[0].length + this.state.pyramids[1].length + this.state.pyramids[2].length)*28 + 64}px`}
    return (
      <section className={this.state.error ? "error" :null}>
        <aside>{this.state.totalNum}</aside>
        <div className="app"  style={appStyles}>
          {this.state.pyramids.map((pyramid, pyramidIndex) => {
            return  <ul className={pyramidIndex === this.state.numFrom ? 'selected' : null} onClick={() => this.handleSelect(pyramidIndex)}  key={pyramidIndex}>{pyramid.map((pyramidItem, pyramidItemIndex) => {
                        let style = {width: `${pyramidItem}%`}
                        return <li style={style} key={pyramidItemIndex}>{pyramidItem}</li>
                      })}

                    </ul>
            })}
        </div>
      </section>
    )
  }
}

export default App;

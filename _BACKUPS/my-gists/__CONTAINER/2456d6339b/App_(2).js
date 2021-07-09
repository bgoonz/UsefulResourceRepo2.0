componentDidMount(){
  fetch("https://jsonbin.io/b/59f721644ef213575c9f6531")
  .then( response => response.json())
  .then( data => { this.setState({posts: data})});
}
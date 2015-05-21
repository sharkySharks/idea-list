var React       = require('react');
var NavBar      = require('./navBar.jsx');
var CommentList = require('./commentList.jsx');
var ideaViewActions = require('../actions/ideaViewActions');
var ideaViewStore   = require('../stores/ideaViewStore');
var commentStore   = require('../stores/commentStore');
var commentActions = require('../actions/commentActions');

var IdeaView = React.createClass({


  getInitialState: function () {
    ideaViewActions.getIdea('id',this.props.params.id);
    commentActions.getComments('votes', this.props.params.id);

    return {
      idea     : ideaViewStore.fetchIdeas(),
      dedit     : ideaViewStore.ideaEditState(),
      comments : commentStore.fetchComments()
    }
  },

  componentDidMount : function(){
     ideaViewActions.getIdea('id',this.props.params.id);
    commentActions.getComments('votes', this.props.params.id);
    commentStore.addChangeListener(this._onChange);
  },

  componentWillUnmount : function(){
    commentStore.removeChangeListener(this._onChange);
  },

  _onChange : function(){
    this.setState({
      idea     : ideaViewStore.fetchIdeas(),
      edit     : ideaViewStore.ideaEditState(),
      comments : commentStore.fetchComments()
    });
  },

  handleSubmit : function(){
    var commentBody = this.refs.parentComment.getDOMNode().value;
    var ideaId      = this.state.idea._id

    var newComment = {
      body       : commentBody,
      parentId   : ideaId,
      parentType : 'idea',
      ideaId     : ideaId
    };

    commentActions.createComment(newComment);

    this.refs.parentComment.getDOMNode().value = '';
  },

  render: function(){

    var tags = this.state.idea.tags.join(", ");
    var time = new Date(this.state.idea.createdAt).toLocaleString();
    console.log('this.state.idea', this.state.idea);

    return(
      <div>
        <NavBar />

        <div className="page-header container">
          <div className="xx-huge text-primary"> {this.state.idea.title} </div>

          <br />

          <div className="text-primary">
            created by:
            &nbsp;
            <img src={this.state.idea.img}/>
            &nbsp;
            <span className="text-white">{this.state.idea.sUserName}</span>
            &nbsp;
            @
            &nbsp;
            {time}
          </div>

          <div className="text-primary"> tags:
            <span className="text-white"> {tags} </span>
          </div>

          <div className="text-primary"> ID for Slack use:
            <span className="text-white"> {this.state.idea.shortId} </span>
          </div>
        </div>

        <div className="container">
          <br />
          <div className="huge text-white"> {this.state.idea.body} </div>
          <br />
        </div>

        <br />

        <div className="container">
          <div className="row">
            <div className="col-md-2"></div>

            <div className="col-md-4">
              <textarea type='text' className="form-control" ref='parentComment' placeholder="add a comment" rows="2"></textarea>
            </div>

            <div className="col-md-6">
              <button className="btn btn-red btn-wide center" onClick={this.handleSubmit}>
                Add Comment
              </button>
            </div>

          </div>
        </div>

        <br />

        <div className="container">
          <CommentList comments={this.state.comments} idea={this.state.idea} />
        </div>

      </div>
    );
  }
})

module.exports = IdeaView;

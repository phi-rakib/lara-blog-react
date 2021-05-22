import React from 'react'

function CommentFormComponent({handleOnChange, handleOnSubmit, comment}) {
  return (
    <form className="ui reply form">
      <div className="field">
        <textarea
          name="body"
          value={comment.body}
          onChange={handleOnChange}
        ></textarea>
      </div>
      <div className="ui blue labeled submit icon button" onClick={handleOnSubmit}>
        <i className="icon edit"></i> Add Reply
      </div>
    </form>
  )
}

export default CommentFormComponent

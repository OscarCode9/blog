const { expect } = require('chai');

describe('query', () => {
  it('should find the comment with the given id', () => {
    // Arrange
    const post = {
      comments: [
        { id: 1, text: 'First comment' },
        { id: 2, text: 'Second comment' },
        { id: 3, text: 'Third comment' },
      ],
    };
    const id = 2;

    // Act
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    // Assert
    expect(comment).to.deep.equal({ id: 2, text: 'Second comment' });
  });

  // Add more test cases here if needed
});
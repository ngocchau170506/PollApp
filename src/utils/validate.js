const validate = {
  createPoll: (data) => {
    const { title, options } = data;
    if (!title || !options || !Array.isArray(options) || options.length < 2) {
      return 'Title and at least two options are required';
    }
    return null;
  },
  vote: (data) => {
    const { optionId } = data;
    if (!optionId) {
      return 'Option ID is required';
    }
    return null;
  }
};

export default validate;
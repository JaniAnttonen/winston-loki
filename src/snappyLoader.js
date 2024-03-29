const snappyLoader = () => {
  try {
    const snappy = require('snappy');
    return snappy;
  } catch (error) {
    console.warn('Warning: Failed to load snappy. Falling back to JSON transport. Ensure snappy is correctly installed if you wish to use it.');
    return null;
  }
};

module.exports = { loadSnappy: snappyLoader };

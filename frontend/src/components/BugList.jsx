import React from 'react';
import BugItem from './BugItem';

const BugList = ({ bugs, updateBug, deleteBug }) => {
  if (!bugs || bugs.length === 0) {
    return (
      <div className="empty-state">
        <h3>No bugs reported yet</h3>
        <p>Report a new bug using the form above.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Reported Bugs ({bugs.length})</h2>
      <div className="bug-list">
        {bugs.map((bug) => (
          <BugItem 
            key={bug._id} 
            bug={bug} 
            updateBug={updateBug} 
            deleteBug={deleteBug} 
          />
        ))}
      </div>
    </div>
  );
};

export default BugList;
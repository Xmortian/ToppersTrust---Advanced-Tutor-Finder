// Controller: ShortListController
// Reuses existing ShortList page logic to avoid behavior changes
import React from 'react';
import ShortListView from '../view/ShortListView';

const ShortListController = () => {
  // Delegate to view which contains the original component logic
  return <ShortListView />;
};

export default ShortListController;

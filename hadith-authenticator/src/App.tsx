/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Layout from './components/Layout';
import HadithSearch from './components/HadithSearch';
import SavedLibrary from './components/SavedLibrary';
import Profile from './components/Profile';
import { AnimatePresence } from 'motion/react';

type Tab = 'search' | 'library' | 'profile';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('search');

  const renderContent = () => {
    switch (activeTab) {
      case 'search':
        return <HadithSearch key="search" />;
      case 'library':
        return <SavedLibrary key="library" />;
      case 'profile':
        return <Profile key="profile" />;
      default:
        return <HadithSearch key="search" />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </Layout>
  );
}


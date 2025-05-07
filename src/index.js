import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

import Modal from './components/common/modals/Modal';
import ConfirmationModal from './components/common/modals/ConfirmationModal';
import AlertModal from './components/common/modals/AlertModal';
import ConnectionModal from './components/common/modals/ConnectionModal';
import TestStatusModal from './components/common/modals/TestStatusModal';
import ReportPreviewModal from './components/common/modals/ReportPreviewModal';
import DeviceConnectionModal from './components/common/modals/DeviceConnectionModal';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


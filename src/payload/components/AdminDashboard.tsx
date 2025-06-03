import React from 'react';
import { AdminView, AdminViewProps } from 'payload/config';
import WaitlistDashboard from './WaitlistDashboard';

const AdminDashboard: React.FC<AdminViewProps> = (props) => {
  return <WaitlistDashboard {...props} />;
};

export default AdminDashboard as AdminView;

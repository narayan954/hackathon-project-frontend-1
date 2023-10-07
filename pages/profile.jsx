import {} from "react";

import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import Navbar from "../components/Navbar";

const ProfilePage = () => {
  return (
    <div className="bg-zinc-900 text-white min-h-screen">
      <Navbar />
      <main className="py-10">
        <Tabs variant="soft-rounded" colorScheme="facebook">
          <TabList justifyContent={"center"} flexWrap={"wrap"} gap={5}>
            <Tab>Profile Details</Tab>
            <Tab>Upcoming Appointments</Tab>
            <Tab>Appointment History</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <UserDetails />
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </main>
    </div>
  );
};

const UserDetails = ({ userDetails }) => {
  return (
    <div>
      <label htmlFor="name">Name</label>
      <input type="text" />
    </div>
  );
};

export default ProfilePage;

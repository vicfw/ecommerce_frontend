import { PersonalInfo } from "@/containers/profile/personal-info/PersonalInfo";
import { Suspense } from "react";

const PersonalInfoPage = () => {
  return (
    <Suspense>
      <PersonalInfo />
    </Suspense>
  );
};

export default PersonalInfoPage;

import { Routes, Route } from "react-router-dom";
import { LogInPage } from "../../pages/LogInPage";
import { SignUpPage } from "../../pages/SignUpPage";
import { HomePage } from "../../pages/HomePage";
import { RenderSearchResultsBlock } from "../../components";
import { ProfilePage } from "../../pages/ProfilePage";
import { NotFound } from "../../pages/NotFound";
import { AccountPage } from "../../pages/AccountPage";
import { ProtectedRoute } from "../ProtectedRoute";
import { AccountEditPage } from "../../pages/AccountEditPage";
import { AccountSettingsPage } from "../../pages/AccountSettings";

export const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route exact path={"/profile/:userId"} element={<ProfilePage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<AccountPage />} />
          <Route path="/accountEdit" element={<AccountEditPage />} />
          <Route path="/settings" element={<AccountSettingsPage />} />
        </Route>
        <Route path="/search/:cityId" element={<RenderSearchResultsBlock />} />
        <Route
          path="/search/:cityId/:pet_size"
          element={<RenderSearchResultsBlock />}
        />
      </Route>
      <Route path={"*"} element={<NotFound />} />
    </Routes>
  );
};

import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import {
  getWorkspaceIdFromURL,
  appendWorkspaceId,
  stripTrailingSlash,
  getSubpath,
  pathnameWithoutSubpath,
} from '@/_helpers/utils';
import { authenticationService, tooljetService, organizationService } from '@/_services';
import { withRouter } from '@/_hoc/withRouter';
import { PrivateRoute } from '@/_components';
import { HomePage } from '@/HomePage';
import { LoginPage } from '@/LoginPage';
import { SignupPage } from '@/SignupPage';
import { TooljetDatabase } from '@/TooljetDatabase';
import { OrganizationInvitationPage } from '@/ConfirmationPage';
import { Authorize } from '@/Oauth2';
import { Authorize as Oauth } from '@/Oauth';
import { Viewer } from '@/Editor';
import { ForgotPassword } from '@/ForgotPassword';
import { ResetPassword } from '@/ResetPassword';
import { GlobalDatasources } from '@/GlobalDatasources';
import Toast from '@/_ui/Toast';
import { VerificationSuccessInfoScreen } from '@/SuccessInfoScreen';
import '@/_styles/theme.scss';
import { AppLoader } from '@/AppLoader';
export const BreadCrumbContext = React.createContext({});
import 'react-tooltip/dist/react-tooltip.css';

const AppWrapper = (props) => {
  return (
    <Suspense fallback={null}>
      <AppWithRouter props={props} />
    </Suspense>
  );
};

class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      fetchedMetadata: false,
      darkMode: localStorage.getItem('darkMode') === 'true',
    };
  }
  updateSidebarNAV = (val) => {
    this.setState({ sidebarNav: val });
  };
  fetchMetadata = () => {
    tooljetService.fetchMetaData();
  };

  isThisExistedRoute = () => {
    const existedPaths = [
      'forgot-password',
      'reset-password',
      'invitations',
      'organization-invitations',
      'setup',
      'confirm',
      'confirm-invite',
    ];

    const subpath = getSubpath();
    const subpathArray = subpath ? subpath.split('/').filter((path) => path != '') : [];
    const pathnames = window.location.pathname.split('/')?.filter((path) => path != '');
    const checkPath = () => existedPaths.find((path) => pathnames[subpath ? subpathArray.length : 0] === path);
    return pathnames?.length > 0 ? (checkPath() ? true : false) : false;
  };

  componentDidMount() {
    if (!this.isThisExistedRoute()) {
      const workspaceId = getWorkspaceIdFromURL();

      if (workspaceId) {
        // this.authorizeUserAndHandleErrors(workspaceId);
      } else {
        const isApplicationsPath = window.location.pathname.includes('/applications/');
        const appId = isApplicationsPath ? pathnameWithoutSubpath(window.location.pathname).split('/')[2] : null;
        authenticationService
          .validateSession(appId)
          .then(({ current_organization_id }) => {
            //check if the page is not switch-workspace, if then redirect to the page
            if (window.location.pathname !== `${getSubpath() ?? ''}/switch-workspace`) {
              this.authorizeUserAndHandleErrors(current_organization_id);
            } else {
              this.updateCurrentSession({
                current_organization_id,
              });
            }
          })
          .catch(() => {
            if (!this.isThisWorkspaceLoginPage(true) && !isApplicationsPath) {
              this.updateCurrentSession({
                authentication_status: false,
              });
            } else if (isApplicationsPath) {
              this.updateCurrentSession({
                authentication_failed: true,
                load_app: true,
              });
            }
          });
      }
    }

    this.fetchMetadata();
    setInterval(this.fetchMetadata, 1000 * 60 * 60 * 1);
  }

  isThisWorkspaceLoginPage = (justLoginPage = false) => {
    const subpath = window?.public_config?.SUB_PATH ? stripTrailingSlash(window?.public_config?.SUB_PATH) : null;
    const pathname = location.pathname.replace(subpath, '');
    const pathnames = pathname.split('/').filter((path) => path !== '');
    return (justLoginPage && pathnames[0] === 'login') || (pathnames.length === 2 && pathnames[0] === 'login');
  };

  authorizeUserAndHandleErrors = (workspaceId) => {
    const subpath = getSubpath();
    this.updateCurrentSession({
      current_organization_id: workspaceId,
    });
    authenticationService
      .authorize()
      .then((data) => {
        organizationService.getOrganizations().then((response) => {
          const current_organization_name = response.organizations.find((org) => org.id === workspaceId)?.name;
          // this will add the other details like permission and user previlliage details to the subject
          this.updateCurrentSession({
            ...data,
            current_organization_name,
            organizations: response.organizations,
            load_app: true,
          });

          // if user is trying to load the workspace login page, then redirect to the dashboard
          if (this.isThisWorkspaceLoginPage())
            return (window.location = appendWorkspaceId(workspaceId, '/:workspaceId'));
        });
      })
      .catch((error) => {
        // if the auth token didn't contain workspace-id, try switch workspace fn
        if (error && error?.data?.statusCode === 401) {
          //get current session workspace id
          authenticationService
            .validateSession()
            .then(({ current_organization_id }) => {
              // change invalid or not authorized org id to previous one
              this.updateCurrentSession({
                current_organization_id,
              });

              organizationService
                .switchOrganization(workspaceId)
                .then((data) => {
                  this.updateCurrentSession(data);
                  if (this.isThisWorkspaceLoginPage())
                    return (window.location = appendWorkspaceId(workspaceId, '/:workspaceId'));
                  this.authorizeUserAndHandleErrors(workspaceId);
                })
                .catch(() => {
                  organizationService.getOrganizations().then((response) => {
                    const current_organization_name = response.organizations.find(
                      (org) => org.id === current_organization_id
                    )?.name;

                    this.updateCurrentSession({
                      current_organization_name,
                      load_app: true,
                    });

                    if (!this.isThisWorkspaceLoginPage())
                      return (window.location = `${subpath ?? ''}/login/${workspaceId}`);
                  });
                });
            })
            .catch(() => this.logout());
        } else if ((error && error?.data?.statusCode == 422) || error?.data?.statusCode == 404) {
          window.location = subpath ? `${subpath}${'/switch-workspace'}` : '/switch-workspace';
        } else {
          if (!this.isThisWorkspaceLoginPage() && !this.isThisWorkspaceLoginPage(true))
            this.updateCurrentSession({
              authentication_status: false,
            });
        }
      });
  };

  updateCurrentSession = (newSession) => {
    const currentSession = authenticationService.currentSessionValue;
    authenticationService.updateCurrentSession({
      ...currentSession,
      ...newSession,
    });
  };

  logout = () => {
    authenticationService.logout();
  };

  switchDarkMode = (newMode) => {
    this.setState({ darkMode: newMode });
    localStorage.setItem('darkMode', newMode);
  };

  render() {
    const { darkMode } = this.state;
    let toastOptions = {
      duration: 7000,
      style: {
        wordBreak: 'break-all',
      },
    };

    if (darkMode) {
      toastOptions = {
        duration: 7000,
        className: 'toast-dark-mode',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          wordBreak: 'break-all',
        },
      };
    }
    const { sidebarNav } = this.state;
    const { updateSidebarNAV } = this;

    return (
      <>
        <div className={`main-wrapper ${darkMode ? 'theme-dark dark-theme' : ''}`} data-cy="main-wrapper">
          <BreadCrumbContext.Provider value={{ sidebarNav, updateSidebarNAV }}>
            <Routes>
              <Route path="/login/:organizationId" exact element={<LoginPage />} />
              <Route path="/login" exact element={<LoginPage />} />
              <Route path="/sso/:origin/:configId" exact element={<Oauth />} />
              <Route path="/sso/:origin" exact element={<Oauth />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/invitations/:token" element={<VerificationSuccessInfoScreen />} />
              <Route
                path="/invitations/:token/workspaces/:organizationToken"
                element={<VerificationSuccessInfoScreen />}
              />
              <Route path="/confirm" element={<VerificationSuccessInfoScreen />} />
              <Route
                path="/organization-invitations/:token"
                element={<OrganizationInvitationPage {...this.props} darkMode={darkMode} />}
              />
              <Route
                path="/confirm-invite"
                element={<OrganizationInvitationPage {...this.props} darkMode={darkMode} />}
              />
              <Route
                exact
                path="/:workspaceId/apps/:id/:pageHandle?/*"
                element={
                  <PrivateRoute>
                    <AppLoader switchDarkMode={this.switchDarkMode} darkMode={darkMode} />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/applications/:id/:pageHandle?"
                element={
                  <PrivateRoute>
                    <Viewer switchDarkMode={this.switchDarkMode} darkMode={darkMode} />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/applications/:slug/:pageHandle?"
                element={
                  <PrivateRoute>
                    <Viewer switchDarkMode={this.switchDarkMode} darkMode={darkMode} />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/oauth2/authorize"
                element={
                  <PrivateRoute>
                    <Authorize switchDarkMode={this.switchDarkMode} darkMode={darkMode} />
                  </PrivateRoute>
                }
              />
              <Route exact path="/" element={<Navigate to="/:workspaceId" />} />
              <Route
                exact
                path="/:workspaceId"
                element={
                  <PrivateRoute>
                    <HomePage switchDarkMode={this.switchDarkMode} darkMode={darkMode} />
                  </PrivateRoute>
                }
              />

              <Route
                exact
                path="/:workspaceId/global-datasources"
                element={
                  <PrivateRoute>
                    <GlobalDatasources switchDarkMode={this.switchDarkMode} darkMode={darkMode} />
                  </PrivateRoute>
                }
              />

              <Route
                exact
                path="/:workspaceId/database"
                element={
                  <PrivateRoute>
                    <TooljetDatabase switchDarkMode={this.switchDarkMode} darkMode={darkMode} />
                  </PrivateRoute>
                }
              />

              <Route
                path="*"
                render={() => {
                  if (authenticationService?.currentSessionValue?.current_organization_id) {
                    return <Navigate to="/:workspaceId" />;
                  }
                  return <Navigate to="/login" />;
                }}
              />
            </Routes>
          </BreadCrumbContext.Provider>
        </div>

        <Toast toastOptions={toastOptions} />
      </>
    );
  }
}

export const App = AppWrapper;
const AppWithRouter = withRouter(AppComponent);

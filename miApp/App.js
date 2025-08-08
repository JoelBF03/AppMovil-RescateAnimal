import Router from './routers/router';
import { Provider as PaperProvider } from 'react-native-paper';
import { UserProvider } from './contexts/userContext';
import { ReportProvider } from './contexts/reportContext';
import { lightTheme } from './theme';

export default function App() {
  return (
    <PaperProvider theme={lightTheme} >
      <UserProvider>
        <ReportProvider>
          <Router />
        </ReportProvider>
      </UserProvider>
    </PaperProvider>
  );
}
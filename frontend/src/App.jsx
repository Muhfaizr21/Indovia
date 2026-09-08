import AppProvidersWrapper from './components/wrappers/AppProvidersWrapper';
import configureFakeBackend from './helpers/fake-backend';
import AppRouter from './routes/router';
configureFakeBackend();
function App() {
  return <>
      <AppProvidersWrapper>
        <AppRouter />
      </AppProvidersWrapper>
    </>;
}
export default App;
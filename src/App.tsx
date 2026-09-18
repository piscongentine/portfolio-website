import { lazy, Suspense } from "react";
import "./App.css";
import WebGLBoundary from "./components/WebGLBoundary";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  return (
    <>
      <LoadingProvider>
        <Suspense>
          <MainContainer>
            <WebGLBoundary>
              <Suspense>
                <CharacterModel />
              </Suspense>
            </WebGLBoundary>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;

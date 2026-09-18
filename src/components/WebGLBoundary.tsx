import { Component, PropsWithChildren, ReactNode } from "react";

interface State {
  hasError: boolean;
}

class WebGLBoundary extends Component<
  PropsWithChildren<{ fallback?: ReactNode }>,
  State
> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("3D content disabled: WebGL is unavailable.", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

export default WebGLBoundary;

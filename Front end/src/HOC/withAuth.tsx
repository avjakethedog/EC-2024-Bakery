const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      window.location.replace("/login");
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;

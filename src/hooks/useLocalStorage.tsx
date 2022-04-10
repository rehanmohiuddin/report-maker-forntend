import React, { useEffect, useState } from "react";

function useLocalStorage() {
  interface Prop {
    token: string;
    email: string;
  }
  const local = localStorage.getItem("user");
  const _user = local ? JSON.parse(local) : {};
  const [user, setUser] = useState<Prop>(_user);
  return [user];
}

export default useLocalStorage;

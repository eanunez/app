import { useLocation } from 'react-router-dom';
import React, { Fragment, useEffect, useState } from 'react';


const Response = () => {
  const [info, setInfo] = useState({});
  let location = useLocation().data;
  useEffect(() => {
    if (location) {
      setInfo(location.data);
    }
  }, [location]);
  return (
      <div>
          {info && <pre>{JSON.stringify(info, null, 2)}</pre>}
      </div>
  );
};

export default Response;
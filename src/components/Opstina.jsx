import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

function District() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dbRef = ref(getDatabase(), 'districts');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setData(Object.values(data));
    });
  }, []);

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>{item.region}</p>
        </div>
      ))}
    </div>
  );
}

export default District;

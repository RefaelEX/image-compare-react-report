import { useEffect, useState } from 'react';
import { fetchInfoJsonData, InfoJsonObject } from './utils/fetchInfoJsonData';
import { CardComponent } from './components/CardComponent';

function App() {
  const [infoJsonData, setInfoJsonData] = useState<InfoJsonObject[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchInfoJsonData();
        setInfoJsonData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const uniqueAttributes = Array.from(
    new Set(
      infoJsonData.flatMap((item) => {
        const parsedItem = JSON.parse(item.message);
        if (!parsedItem || !parsedItem.Tests) {
          return [];
        }
        return parsedItem.Tests.map((test: any) => test.Attribute);
      })
    )
  );

  const handleCheckboxChange = (attribute: string) => {
    setSelectedAttributes((prev) =>
      prev.includes(attribute)
        ? prev.filter((attr) => attr !== attribute)
        : [...prev, attribute]
    );
  };

  const filteredImageData =
    selectedAttributes.length === 0
      ? infoJsonData
      : infoJsonData.filter((item) => {
          const parsedItem = JSON.parse(item.message);
          return parsedItem.Tests?.some((test: any) =>
            selectedAttributes.includes(test.Attribute)
          );
        });

  return (
    <div className="App">
      <header className="App-header">App Header</header>
      <div className="filter-checkboxes" style={{ marginBottom: '20px' }}>
        {uniqueAttributes.map((attribute) => (
          <label key={attribute} style={{ marginRight: '15px' }}>
            <input
              type="checkbox"
              value={attribute}
              checked={selectedAttributes.includes(attribute)}
              onChange={() => handleCheckboxChange(attribute)}
              style={{ marginRight: '5px' }}
            />
            {attribute}
          </label>
        ))}
      </div>

      <div className="body">
        {filteredImageData.map((item) => (
          <CardComponent
            key={item.spec_id}
            left={`/result/${item.left}`}
            right={`/result/${item.right}`}
            specId={item.spec_id}
            message={item.message}
            resourceType={item.resource_type}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

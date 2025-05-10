
// Helper utility to parse CSV data from strings
export const parseCSV = (csvString: string): any[] => {
  const rows = csvString.trim().split('\n');
  const headers = rows[0].split(',');
  
  return rows.slice(1).map(row => {
    const values = row.split(',');
    const entry: Record<string, string | number> = {};
    
    headers.forEach((header, index) => {
      // Try to convert values that look like numbers to actual numbers
      const value = values[index].trim();
      const numValue = parseFloat(value);
      entry[header.trim()] = isNaN(numValue) ? value : numValue;
    });
    
    return entry;
  });
};

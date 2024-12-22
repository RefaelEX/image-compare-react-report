export const fetchInfoJsonData = async (): Promise<InfoJsonObject[]> => {
    const response = await fetch('/result/info.json');
    if (!response.ok) {
      throw new Error('Failed to load JSON');
    }
    return await response.json();
  };
  
  /**
   * InfoJsonObject is the type of the JSON object that is fetched from the info.json file.
   */
  export interface InfoJsonObject {
    left: string;
    right: string;
    message: string;
    spec_id: string;
    resource_type: 'video' | 'image' | 'unknown';
}
 
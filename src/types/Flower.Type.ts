export type TFlower = {
  _id: string;
  name: string;
  color: string;
  bloomDate: string | Date;
  price: number;
  quantity: number;
  size: string;
};

 export interface BulkDeleteData {
  ids: string[];
}



export const formatBloomDate = (bloomDate: any) => {
  const date = new Date(bloomDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

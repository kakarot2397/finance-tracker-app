export interface Transaction
{
  id:number | null;
  date:string;
  description:string;
  amount:number| null;
  type:'income'|'expense';
}
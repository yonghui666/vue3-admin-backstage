/*
 * @Author: yonghui666
 * @Date: 2022-03-17 16:05:38
 * @LastEditors: yonghui666
 * @LastEditTime: 2022-06-08 16:41:29
 * @Description: 文件描述
 */
export interface TableResponse<T> {
  list: T[];
  page_size: number;
  page_no: number;
  total_count: number;
  // total_page: number;
}

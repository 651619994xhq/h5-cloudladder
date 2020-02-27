import awaitWrap from './awaitWrap';
import axios from './Axios';
import api from './api';

//获取任务进程
export const getTaskProcess =(param={})=>{
  return awaitWrap(axios.post(api.GET_TASK_PROCESS,{}))
};
//增加任务
export const addTaskProcess =(param={})=>{
  return awaitWrap(axios.post(api.ADD_TASK_PROCESS,{}))
}


import appHandlers from './app';
import postHandlers from './posts';
import userHandlers from './users';

const handlers = [...appHandlers, ...postHandlers, ...userHandlers];

export default handlers;

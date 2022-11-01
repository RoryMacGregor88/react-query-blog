import appHandlers from './app';
import postHandlers from './posts';

const handlers = [...appHandlers, ...postHandlers];

export default handlers;

import { LocalFileStorage } from '@mjackson/file-storage/local';

const fileStorage = new LocalFileStorage('public/');

export { fileStorage };

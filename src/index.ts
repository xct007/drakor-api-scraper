import axios from 'axios';

const API_ENDPOINT_LATEST = 'https://wincamp.web.id/drakor/phalcon/api/get_category_ongoing_drakor/v1';
const API_ENDPOINT_SEARCH = 'https://wincamp.web.id/drakor/phalcon/api/search_category_collection/v1';
const API_ENDPOINT_CATEGORY = 'https://wincamp.web.id/drakor/phalcon/api/get_category_posts_drakor/v1';
const API_ENDPOINT_CHANNEL = 'https://wincamp.web.id/drakor/phalcon/api/get_post_description_drakor/v1';

/**
 * Get latest update/ongoing drakor
 * @param {Number} limit
 **/
export const latest = async (limit?: number): Promise<object | boolean> => {
	let Params: any = new URLSearchParams();
	Params.append('page', 1);
	Params.append('count', limit ? limit : 10);
	Params.append('isAPKvalid', true);

	const { data } = await axios.request({
		url: API_ENDPOINT_LATEST,
		method: 'POST',
		headers: {
			'Data-Agent': 'Drakor ID v1.4',
			'Content-Type': 'application/x-www-form-urlencoded',
			'User-Agent': 'okhttp/3.10.0',
		},
		data: Params,
	});
	if (data.status == 'ok' && data.categories.length) {
		return data;
	} else {
		return false;
	}
};
/**
 * Search drakor
 * @param {String} query
 *
 **/
export const search = async (query: string): Promise<object> => {
	let result: object;
	let Params: any = new URLSearchParams();
	Params.append('pilihan', 'Serial Drama');
	Params.append('search', query);
	Params.append('page', 1);
	Params.append('count', 20);
	Params.append('isAPKvalid', true);

	const { data } = await axios.request({
		url: API_ENDPOINT_SEARCH,
		method: 'POST',
		headers: {
			'Data-Agent': 'Drakor ID v1.4',
			'Content-Type': 'application/x-www-form-urlencoded',
			'User-Agent': 'okhttp/3.10.0',
		},
		data: Params,
	});
	if (data.status == 'ok' && data.categories.length) {
		result = {
			found: true,
			...data,
		};
	} else {
		result = {
			found: false,
			status: false,
		};
	}
	return result;
};

/**
 * Get drakor detail, eg. title, description, rating, etc.
 * @param {Number} id
 **/
export const detail = async (id: number): Promise<object | boolean> => {
	let result: object | boolean;
	let Params: any = new URLSearchParams();
	Params.append('id', id);
	Params.append('page', 1);
	Params.append('count', 20);
	Params.append('isAPKvalid', true);
	const { data } = await axios.request({
		url: API_ENDPOINT_CATEGORY,
		method: 'POST',
		headers: {
			'Data-Agent': 'Drakor ID v1.4',
			'Content-Type': 'application/x-www-form-urlencoded',
			'User-Agent': 'okhttp/3.10.0',
		},
		data: Params,
	});
	if (data.status == 'ok' && data.posts.length) {
		result = data;
	} else {
		try {
			Params.delete('id');
			Params.delete('page');
			Params.delete('count');
			Params.delete('isAPKvalid');
			Params.append('channel_id', id);
			Params.append('isAPKvalid', true);
			const _data = await axios.request({
				url: API_ENDPOINT_CHANNEL,
				method: 'POST',
				headers: {
					'Data-Agent': 'Drakor ID v1.4',
					'Content-Type': 'application/x-www-form-urlencoded',
					'User-Agent': 'okhttp/3.10.0',
				},
				data: Params,
			});
			if (_data.data.status == 'ok' && _data.data.channel_id == id) {
				result = _data.data;
			} else {
				result = false;
			}
		} catch (e: any) {
			result = false;
		}
	}
	return result;
};
const drakor = {
	latest,
	search,
	detail,
};
export default drakor;

const fs = require("fs");
class localJson {
	path;
	local;

	constructor(path) {
		try {
			path = `./${path}`;
			this.path = this.path = require(path);
			this.local = path;
		} catch (error) {
			throw new Error("Json não encontrado ou não esta no formato adequado " + path);
		}
	}

	seeData() {
		return this.path;
	}

	update() {
		try {
			fs.writeFileSync(this.local, JSON.stringify(this.path), (err) => {
				if (err) throw err;
			});
		} catch (error) {
			throw error;
		}
	}

	add(data) {
		if (!this.path.includes(data)) {
			this.path.push(data);
			fs.writeFileSync(this.local, JSON.stringify(this.path), (err) => {
				if (err) throw err;
			});
			console.log(`${data} Adicionado ao json ${this.local}`);
			console.log(this.path);
		} else {
			console.log(`${data} Já esta no Json`);
		}
	}

	addForce(data) {
		this.path.push(data);
		fs.writeFileSync(this.local, JSON.stringify(this.path), (err) => {
			if (err) throw err;
		});
		console.log(`${data} Adicionado ao json ${this.local}`);
		console.log(this.path);
	}

	remove(data) {
		try {
			if (this.path.includes(data)) {
				do {
					let index = this.path.indexOf(data);
					this.path.splice(index, 1);
					fs.writeFileSync(this.local, JSON.stringify(this.path), (err) => {
						if (err) throw err;
					});
				} while (this.path.includes(data));
				console.log(`${data} Removido do Json`);
			} else {
				console.log(`${data} Não esta no Json`);
			}
		} catch (error) {
			console.log(error);
		}
	}

	hasData(data) {
		try {
			return this.path.includes(data);
		} catch (error) {
			console.log(error);
		}
	}

	removeAll() {
		try {
			this.path = [];
			this.update();
		} catch (error) {}
	}
}

module.exports = localJson;

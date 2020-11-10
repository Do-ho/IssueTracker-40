import { getRepository } from "typeorm";
import { Transactional } from "typeorm-transactional-cls-hooked";
import { Label } from "../model/label";
import { EntityAlreadyExist } from "../common/error/entity-already-exist";

class LabelService {
    constructor() {
        this.labelRepository = getRepository(Label);
    }

    static instance = null;

    static getInstance() {
        if (LabelService.instance === null) {
            LabelService.instance = new LabelService();
        }
        return LabelService.instance;
    }

    createLabel({ name, color, description }) {
        const newLabel = new Label();
        newLabel.name = name;
        newLabel.color = color;
        newLabel.description = description;

        return newLabel;
    }

    async isLabelExistByName({ name }) {
        const label = await this.getLabelByName(name);
        return label === undefined;
    }

    async getLabelByName(labelname) {
        const label = await this.labelRepository.findOne({ name: labelname });
        return label;
    }

    async getLabels() {
        const label = await this.labelRepository.find();
        return label;
    }

    @Transactional()
    async addLabel(newLabel) {
        const { name } = newLabel;

        if (!(await this.isLabelExistByName({ name }))) {
            throw new EntityAlreadyExist();
        }

        const result = await this.labelRepository.save(newLabel);
    }
}

export { LabelService };
import { Boom } from '@hapi/boom'
import { Action, FormSubmission } from '../OpenAPI'

const assertValidFormFields = (fields: FormSubmission['fields'], questions: Action[]) => {
    for (const key in fields) {
        const question = questions.find((q) => q.id === key)
        if (!question) {
            throw new Boom(`question ${key} not found`, { statusCode: 400 })
        }

        if (!question.message?.input?.validation) {
            continue
        }

        if (question.message?.input?.validation.type === 'integer') {
            if (!Number.isInteger(fields[key])) {
                throw new Boom(`field ${key} must be an integer`, { statusCode: 400 })
            }
        }

        if (question.message?.input?.validation.type === 'string') {
            if (typeof fields[key] !== 'string') {
                throw new Boom(`field ${key} must be a string`, { statusCode: 400 })
            }
        }

        if (question.formActionMetadata?.type === 'rating') {
            if (fields[key] < 1 || fields[key] > 5) {
                throw new Boom(`field ${key} must be between 1 and 5`, { statusCode: 400 })
            }
        }

        if (question.formActionMetadata?.type === 'nps') {
            if (fields[key] < 0 || fields[key] > 10) {
                throw new Boom(`field ${key} must be between 0 and 10`, { statusCode: 400 })
            }
        }

        if (question.formActionMetadata?.type === 'date') {
            if (!Date.parse(fields[key])) {
                throw new Boom(`field ${key} must be a valid date`, { statusCode: 400 })
            }
        }

        if (question.formActionMetadata?.type === 'time') {
            if (!Date.parse(`1/1/1970 ${fields[key]}`)) {
                throw new Boom(`field ${key} must be a valid time`, { statusCode: 400 })
            }
        }

        if (question.formActionMetadata?.type === 'select') {
            if (!question.message.buttons?.find((b) => b.text === fields[key])) {
                throw new Boom(
                    `field ${key} must be one of ${question.message.buttons?.map((b) => b.text).join(', ')}`,
                    { statusCode: 400 }
                )
            }
        }

        if (question.formActionMetadata?.type === 'multiselect') {
            const values = fields[key].split(',')
            if (!values.every((v) => question.message?.buttons?.find((b) => b.text === v))) {
                throw new Boom(
                    `field ${key} must be one of ${question.message.buttons?.map((b) => b.text).join(', ')}`,
                    { statusCode: 400 }
                )
            }
        }
    }
}

export default assertValidFormFields

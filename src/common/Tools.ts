//переход на автоматическое регулирование по 0
import {DispatchCommand, Model} from "./index";

export const PhaseCommandType = 9

export const getDescription = (status: boolean, command: DispatchCommand) => {
    if (!status) return "Отсутствует связь с сервером"
    switch (command.cmd) {
        case 4:
            if (command.param === 1) {
                return 'Отправлен запрос на смену фаз';
            } else {
                return 'Отключить запрос на смену фаз';
            }
        case 5:
            if (command.param === 0) return 'Отправлена команда "Переход на автоматическое регулирование ПК"';
            return `Отправлена команда "Сменить ПК на №${command.param}"`;
        case 6:
            if (command.param === 0) return 'Отправлена команда "Переход на автоматическое регулирование СК"';
            return `Отправлена команда "Сменить CК на №${command.param}"`;
        case 7:
            if (command.param === 0) return 'Отправлена команда "Переход на автоматическое регулирование НК"';
            return `Отправлена команда "Сменить НК на №${command.param}"`;
    }
    switch (command.param) {
        case 0:
            return 'Отправлена команда "Локальный режим"';
        case 9:
            return 'Отправлена команда "Координированное управление"';
        case 10:
            return 'Отправлена команда "Включить жёлтое мигание"';
        case 11:
            return 'Отправлена команда "Отключить светофоры"';
    }
    return `Отправлена команда "Включить фазу №${command.param}"`;
}

// Расшифровка типа устройства
export const switchArrayTypeFromDevice = (model: Model | undefined) => {
    if (!model) return ""
    if (model.C12) return "С12УСДК"
    if (model.DKA) return "ДКА"
    if (model.DTA) return "ДТА"
    return "УСДК"
}
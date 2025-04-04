import connection from "./connection"

var global_network: {network: InstanceType<typeof connection> | null, ip: string} = {
    network: null,
    ip: "192.168.0.193:8000"
}

export default global_network
import connection from "./connection"

const global_network: {network: InstanceType<typeof connection> | null, ip: string} = {
    network: null,
    ip: "localhost:8000"
}

export default global_network